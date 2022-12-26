# netflix-clone-refactoring
4월에 해당 프로젝트를 진행했을 때, 아쉬웠던 기능들을 라이브러리를 사용하지 않고 직접 구현하는 시간을 가졌습니다.
<br>
<br>

### Slider
기존에는 Slider을 'react-slick' 라이브러리를 사용하여 구현했었습니다. <br>
custom하여 CSS를 적용하기 어려웠고, hover를 했을 때 확대되는 이미지가 깨지는 이슈가 있었습니다. <br>
해당 부분들을 해결하기 위해 라이브러리를 사용하지 않고, 직접 구현하는 시간을 가졌습니다. <br>


``` typescript 
// useSlider.ts ( 일부분만 발췌하였습니다. )

import React from "react";

const PADDINGS = 110;

const useSlider = (elementWidth: number, countElements: number) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = React.useState<number>(0);
  const [distance, setDistance] = React.useState<number>(0);
  const [totalInViewport, setTotalInViewport] = React.useState<number>(0);
  const [viewed, setViewed] = React.useState<number>(0);


  React.useEffect(() => {
    if (containerRef.current) { 
      // 전체 컨테이너 width 
      const containerWidth = containerRef.current.clientWidth - PADDINGS;
      setContainerWidth(containerWidth);
      // 보여지는 card 개수 
      setTotalInViewport(Math.floor(containerWidth / elementWidth));
    }
  }, [containerRef?.current]);


  const handlePrev = () => {
    setViewed(viewed - totalInViewport);
    setDistance(distance + containerWidth);
  };

  const handleNext = () => {
    setViewed(viewed + totalInViewport);
    setDistance(distance - containerWidth);
  };

  const slideProps = { // 애니메이션 
    style: { transform: `translate3d(${distance}px, 0, 0)` },
  };

  const hasPrev = distance < 0;
  const hasNext = viewed + totalInViewport < countElements;

  return { handlePrev, handleNext, slideProps, containerRef, hasPrev, hasNext };
};

export default useSlider;

```
현재 보여지는 컨테이너의 크기와 박스 한개의 크기를 구해서 보여지는 card 개수를 구하였고, <br>
그걸 이용해 distance / view 값을 구하여 화살표를 클릭 했을 때 움직이는 애니메이션을 구현할 수 있었습니다. <br>

해당 기능을 구현하면서 생겼던 문제점은 아래의 블로그에 포스팅해두었습니다. 참고 부탁드립니다. <br>
https://velog.io/@dea8307/useRef-current-null-%EB%AC%B8%EC%A0%9C

<br>

### InfiniteScroll 
이 기능은 프로젝트 진행 시, 라이브러리를 사용하지는 않고 'scroll Event'로 기능을 구현하였습니다. <br>
하지만, 스크롤할 때마다 이벤트가 발생하였고 reflow, repaint 관점에서 해당 부분을 계속 그리고 있기 때문에 <br>
성능적으로 개선해야할 부분이라고 생각하였고 Intersection Observer API 사용하여 다시 구현하였습니다. <br>

``` typescript 
import { useEffect, useState, useMemo, MutableRefObject, useRef } from 'react';

// Props 타입 정의
interface InfiniteScrollProps {
  root?: Element | null;
  rootMargin?: string;
  target: MutableRefObject<HTMLDivElement | null>;
  threshold?: number;
  targetArray: Array<any>;
  endPoint?: number;
}

const useInfiniteScroll = ({
                             root,
                             target,
                             threshold,
                             rootMargin,
                             targetArray,
                             endPoint = 1
                           }: InfiniteScrollProps) => {
                             
  const [count, setCount] = useState<number>(0);
  // 현재 관찰중인 ele과 다른 것과 같은 지 확인하기 위함 
  const currentChild = useRef<Element | null>(null);
                             
  
  // 콜백함수 
  const callbackFun: IntersectionObserverCallback = (entries, observer) => {
    if(target.current === null ){
      return ;
    }

    if (entries[0].isIntersecting) { 
    // Check the value of the isIntersecting property to see if the entry represents an element that currently intersects with the root.
          setCount((v) => v + 1);
          // setCount가 무한으로 올라가는 것을 방지
          observer.disconnect();
    }
  }
  
  // 함수 생성 
  const observer = new IntersectionObserver(callbackFun)
  
  useEffect(() => {
    if (target?.current === null) {
      return;
    }
    // 관측하는 Element가 달라졌는 지 확인하고 달라졌다면 관찰할 부분을 다시 관찰한다. 
    const observeChild = target.current.children[target.current.children.length - endPoint];
    if (observeChild && currentChild.current !== observeChild) {
      currentChild.current = observeChild;
      observer.observe(observeChild);
    }
    return () => { // 메모리 방지
      if (target.current !== null && observer) {
        observer.unobserve(target.current);
      }
    };
  }, [count, targetArray, target, endPoint]);

  return {
    count,
    setCount
  };
};

export default useInfiniteScroll;

```

제가 생각하는 해당 기능의 포인트는 관찰자 지정 및 관찰자가 달라졌는 지 확인하고 다시 관찰하는 로직인 것 같습니다.  <br>
관찰해야할 부분을 ref 함수로 target해주고, 관찰자가 달라졌을 때 데이터를 추가로 불러오는 과정은 array state에 <br>
추가로 데이터를 넣어주는 것으로 대체하여 구현하였습니다. <br>


import axios from 'axios';

const CategoryList = [
  { id: '12', name: '모험' },
  { id: '14', name: '판타지' },
  { id: '16', name: '애니메이션' },
  { id: '18', name: '드라마' },
  { id: '27', name: '공포' },
  { id: '35', name: '역사' },
  { id: '37', name: '서부' },
  { id: '53', name: '스릴러' },
  { id: '80', name: '범죄' },
  { id: '99', name: '다큐멘터리' },
  { id: '878', name: 'SF' },
  { id: '9648', name: '미스터리' },
  { id: '10402', name: '음악' },
  { id: '10749', name: '로맨스' },
  { id: '10751', name: '가족' },
  { id: '0752', name: '전쟁' },
  { id: '10770', name: 'TV 영화' },
];
const category = (categoryNum?: string[] | string | null) => {
  if (typeof categoryNum === 'string') {
    let categoryName: string = '';
    CategoryList.forEach((category) => {
      if (categoryNum === category.id) {
        categoryName = category.name;
      }
    });
    return categoryName;
  } else if (typeof categoryNum === 'object') {
    let categoryName: any = [];
    categoryNum?.map((num) => {
      CategoryList.forEach((category) => {
        if (num === category.id) {
          categoryName.push(category.name);
        }
      });
    });
    return categoryName;
  }
};
export default category;

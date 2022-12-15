import React from "react";
import { SliderContextProps } from "@components/netflix-row";

const SliderContext = React.createContext<Partial<SliderContextProps>>({});

export default SliderContext;

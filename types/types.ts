export interface SVGTypes {
  className?: string;
  fill?: string;
}

export interface LinkItem {
  title: string;
  ref: string;
  subMenu?: LinkItem[];
}

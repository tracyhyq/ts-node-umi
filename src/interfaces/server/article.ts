// tslint:disable:no-any
export interface IArticleListRequest {
  tag?: string;
  count?: string | number;
  apikey: string;
}

export interface ITagItem {
  count: number;
  name: string;
  title: string;
}

export interface IImage {
  small?: string;
  large?: string;
  medium?: string;
}

export interface ISeries {
  id: string;
  title: string;
}

export interface IArticleItem {
  rating: {
    max: number;
    numRaters: number;
    average: string;
    min: number;
  };
  subtitle: string;
  author: string[];
  pubdate: string;
  tags: ITagItem[];
  origin_title: string;
  image: string;
  binding: string;
  translator: any[];
  catalog: string;
  pages: string;
  images: IImage;
  alt: string;
  id: string;
  publisher: string;
  isbn10: string;
  isbn13: string;
  title: string;
  url: string;
  alt_title: string;
  author_intro: string;
  summary: string;
  series: ISeries;
  price: string;
}

export interface IArticle {
  count: number;

  start: number;

  total: number;

  books: IArticleItem[];
}

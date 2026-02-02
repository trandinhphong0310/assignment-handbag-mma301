export type Feedback = {
  user: string,
  comment: string,
  date: string,
}

export type HandBag = {
  id: string,
  handbagName: string,
  cost: number,
  category?: string,
  color?: string[],
  gender?: boolean,
  uri: string,
  brand: string,
  percentOff: number,
  rating: number,
  isFavorite: boolean,
  description: string,
  feedback: Feedback[],
}

export type RootStackParamList = {
  Home: undefined;
  Detail: {
    id: string
  }
}

export type TabParamList = {
  HomeTabs: undefined;
  'Favorite List': undefined
}
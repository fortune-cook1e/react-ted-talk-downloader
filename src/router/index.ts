export interface Route {
  path: string;
  text: string;
}

export const routes: Route[] = [
  {
    path: '/ted',
    text: 'TED TALK',
  },
  {
    path: '/economist',
    text: 'Economist',
  },
];

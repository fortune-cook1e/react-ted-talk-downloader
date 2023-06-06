import reqRequest from '@/utils/tedRequest';

export const getTedHtml = (url: string):Promise<string> =>
  reqRequest({
    url: '/app/ted',
    method: 'post',
    data: {
      url,
    },
  });

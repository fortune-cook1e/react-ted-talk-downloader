import { PresetTedListRequest, PresetTedListResponse } from '@/types/ted';
import request from '@/utils/request';

// export const getTedHtml = (url: string): Promise<string> =>
//   reqRequest({
//     url: '/app/ted',
//     method: 'post',
//     data: {
//       url,
//     },
//   });

export const getPresetTedList = (params: PresetTedListRequest): Promise<PresetTedListResponse> =>
  request({
    url: '/ted/preset',
    method: 'get',
    params,
  });

export const getSearchTedResult = (keyword: string): Promise<any> =>
  request({
    url: '/ted/search',
    method: 'get',
    params: {
      keyword,
    },
  });

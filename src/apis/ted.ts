import { PresetTedListRequest, PresetTedListResponse, TedCrawlerRequest } from '@/types/ted';
import request from '@/utils/request';

export const getPresetTedList = (params: PresetTedListRequest): Promise<PresetTedListResponse> =>
  request({
    url: '/ted/preset',
    method: 'get',
    params,
  });

// 搜索ted talk数据
export const getCrawlerTedList = (data?: TedCrawlerRequest): Promise<PresetTedListResponse> =>
  request({
    url: '/ted/crawler',
    method: 'post',
    data,
  });

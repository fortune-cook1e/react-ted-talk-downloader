import {
  PresetTedListRequest,
  PresetTedListResponse,
  TedCrawlerRequest,
  TedTalkData,
} from '@/types/ted';
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

export const saveAsPreset = (data: TedTalkData) =>
  request({
    url: '/ted/create',
    method: 'post',
    data,
  });

export const deleteTed = (id: string) =>
  request({
    url: '/ted/delete',
    method: 'delete',
    data: {
      id,
    },
  });

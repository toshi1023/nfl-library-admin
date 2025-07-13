import { IRosterDomain } from "./domainTypes";

/******************************************************************
* Request
*******************************************************************/
export interface ISearchQuery {
    season?: number;            // 検索するシーズン
    status?: number;            // 限定する攻守ステータス
    team?: number;              // 検索するチーム
    conditions?: string;        // TableSearchInputにて入力した検索条件
}

/******************************************************************
* 共通Response
*******************************************************************/
/**
 * 正常終了時のレスポンス補足型定義
 */
interface IInfoResponse {
    message: string | null;
    status: number;
}
/**
 * 正常終了時のレスポンス共通型
 */
export interface ISuccessResponse<T> extends IInfoResponse {
    data: T;
}


/******************************************************************
* 個別Response
*******************************************************************/
/**
 * fetchSearchedRosterのレスポンス型
 */
export interface ISearchedRosterResponse {
    rosters: IRosterDomain[]; // レスポンスのデータ部分
}

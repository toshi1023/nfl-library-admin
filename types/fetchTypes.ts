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
* Response
*******************************************************************/
/**
 * 正常終了時のレスポンス共通型
 */
interface IInfoResponse {
    message: string | null;
    status: number;
}
/**
 * fetchSearchedRosterのレスポンス型
 */
export interface ISearchedRosterResponse extends IInfoResponse {
    rosters: IRosterDomain[];
}
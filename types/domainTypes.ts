/******************************************************************
* データ取得用インターフェイス
*******************************************************************/
export interface IRosterDomain {
    id: number;
    season: number;
    team_id: number;
    player_id: number;
    position_id: number;
    number: number;
    rating: number;
    experience: number;
    team: ITeamDomain;
    player: IPlayerDomain;
    position: IPositionDomain;
    roster_starter: IStarterDomain | null;
}

export interface IPlayerDomain {
    id: number;
    firstname: string;
    lastname: string;
    birthday: number;
    height: number;
    weight: number;
    college: string;
    drafted_team: string | null;
    drafted_round: string | null;
    drafted_rank: string | null;
    drafted_year: string | null;
    image_file: string | null;
    birthday_year: number;
    birthday_date: string;
    image_url: string;
}

export interface ITeamDomain {
    id: number;
    city: string;
    name: string;
    conference: number;
    area: number;
    image_file: string | null;
    back_image_file: string | null;
}

export interface IPositionDomain {
    id: number;
    abstract_category: number;
    category: number;
    name: string;
}

export interface IStarterDomain {
    id: number;
    season: number;
    odflg: boolean;
    roster_id: number;
}

/******************************************************************
* Register / Edit用インターフェイス
*******************************************************************/
export interface IEditRosterDomain {
    // rostersテーブルの更新内容
    roster: {
        number: string | number;
        position_id: number;
        rating: string | number;
    },
    // playersテーブルの更新内容
    player: {
        firstname: string;
        lastname: string;
        birthday: string;
        height: string | number;
        weight: string | number;
        college: string;
        drafted_team: string | null;
        drafted_round: string | null;
        drafted_rank: string | null;
        drafted_year: string | null;
    }
}
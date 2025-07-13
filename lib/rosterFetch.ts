import { ISearchedRosterResponse, ISearchQuery } from "@/types/fetchTypes"

export const fetchSearchedRoster = async (query?: ISearchQuery): Promise<ISearchedRosterResponse | void> => {
    if(!query?.hasOwnProperty('season')) return
    if(!query?.hasOwnProperty('team')) return
    if(!query?.hasOwnProperty('conditions')) return
    const res = await fetch(
        new URL(`http://localhost/api/players/info?season=${query.season}&team_id=${query.team}`)
    )
    const rosters: ISearchedRosterResponse = await res.json()
    return rosters
}
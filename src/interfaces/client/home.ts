/*
 * @description: home
 * @author: Tommy.H.Fu
 * @LastEditors: Tommy.H.Fu
 * @LastEditTime: 2020-01-10 16:25
 */

interface BuiltByItem {
    username: string;
    href: string;
    avatar: string;
}

export interface ProjectItem {
    author: string,
    name: string,
    avatar: string,
    url: string,
    description: string,
    language: string,
    languageColor: string,
    stars: number,
    forks: number,
    currentPeriodStars: number,
    builtBy: BuiltByItem[]
}

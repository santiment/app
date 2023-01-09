type EmptyCreationProps = {
    id: string
    title: string
    action?: string
    description?: string
}

export interface IEmptyCreation {
    getEmptyCreationsProps(): EmptyCreationProps;
}

type MenuAttributes = {
    voted?: boolean
    favorites?: boolean
    currentUserDataOnly?: boolean
    userRoleDataOnly?: boolean
    isFeaturedDataOnly?: boolean
}

export class MenuItem {
    name: string;
    svg: string | null;
    attributes: MenuAttributes;

    constructor(name: string, svg: string | null, attributes: MenuAttributes = {}) {
        this.name = name
        this.svg = svg
        this.attributes = attributes
    }

    is(name: string) {
        return this.name === name
    }

    hasAttribute(key: string): boolean {
        return this.attributes[key] || false
    }

    getMenuTitle() {
        if (this.is("Santiment")) {
            return `By ${this.name}`
        }
        return this.name
    }
}

class LikesMenuItem extends MenuItem implements IEmptyCreation {
    getEmptyCreationsProps(): EmptyCreationProps {
        return {
            id: "rocket",
            action: "like",
            title: "No liked",
        }
    }
}

class MyCreationsMenuItem extends MenuItem implements IEmptyCreation {
    getEmptyCreationsProps(): EmptyCreationProps {
        return {
            id: "browser",
            action: "make",
            title: "No",
        }
    }
}

const Favoriates = new MenuItem('Favorites', null, {favorites: true})
const Santiment = new MenuItem('Santiment', "santiment", {userRoleDataOnly: true, isFeaturedDataOnly: true})
const New = new MenuItem("New", "time")
const Likes = new LikesMenuItem("My likes", "rocket", {voted: true})
const MyCreations = new MyCreationsMenuItem("My creations", "user", {currentUserDataOnly: true})
const Trending = new MenuItem("Trending", "fire", {isFeaturedDataOnly: true})

export const visibleMenus: MenuItem[] = [Trending, New, Santiment, Likes, MyCreations]

export default {
    Favoriates,
    Santiment,
    New,
    Likes,
    MyCreations,
    Trending
}

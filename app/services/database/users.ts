import { PlanInfo } from "~/types/PlanInfo"
import { UserType } from "~/types/User"

class Plan {
  constructor(
    readonly name: string,
    readonly details: PlanInfo
  ) {}
}

class User {
  plan: Plan | null
  constructor(readonly username: string) {
    this.plan = null
  }

  changePlan(name: string, planInfo: PlanInfo) {
    this.plan = new Plan(name, planInfo)
  }

  toJSON(): UserType {
    return {
      planInfo: this.plan
        ? { ...this.plan.details, name: this.plan.name }
        : null,
      username: this.username,
    }
  }
}

const users: Record<string, User> = {
  vitormarkis: new User("vitormarkis"),
  kauan: new User("kauan"),
  leo: new User("leo"),
  thomas: new User("thomas"),
}

export const usersRepository = {
  get(username: string): Promise<User> {
    const foundUser = users[username]
    if (!foundUser)
      return Promise.reject(`No user found with username: [${username}]`)
    return Promise.resolve(foundUser)
  },
  list(): Promise<User[]> {
    const usersList = Object.values(users)
    return Promise.resolve(usersList)
  },
  save(user: User): Promise<User> {
    users[user.username] = user
    return Promise.resolve(user)
  },
}

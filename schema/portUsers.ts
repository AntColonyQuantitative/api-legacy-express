const typeDefs = `
type PortalUser {
  id: Int!
  email: String!
  ref: String
  realName: String
  displayName: String
  password: String
  mobile: String
  wechat: String
  qq: String
  lastLoginTime: String
  vipTimeoutAt: String
  lastLoginIP: String
  isActivated: Boolean
  isDeleted: Boolean
}

type Query {
  getUsers: [PortalUser!]!
  getUserByEmail(email: String!): PortalUser
  authenticUser(email: String!, password: String!): AuthPayload
}

type SignUpPayload {
  token: String
}

type AuthPayload {
  token: String
}

type Mutation {
  createUser(input: CreateUserInput!): SignUpPayload!
  updateUser(input: UpdateUserInput!): PortalUser!
  deleteUser(id: Int!): PortalUser!
}

input CreateUserInput {
  email: String!
  realName: String
  displayName: String
  password: String
  mobile: String
  wechat: String
  qq: String
  ref: String
}

input UpdateUserInput {
  email: String
  ref: String
  realName: String
  displayName: String
  password: String
  mobile: String
  wechat: String
  qq: String
  lastLoginTime: String
  vipTimeoutAt: String
  lastLoginIP: String
  isActivated: Boolean
  isDeleted: Boolean
}
`
export default typeDefs;
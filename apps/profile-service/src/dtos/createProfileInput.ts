export class CreateProfileInputDTO {
  auth0AccountId: string;
  avatar: string;
  firstName: string;
  userName: string;
  lastName: string;
  description?: string;
}

export interface UserProps {
  readonly Email: string;
}

export interface GetAllUsersProps {
  readonly pageNumber: number;
  readonly pageSize: number;
  readonly status?: string;
  readonly searchValue?: string;
}

export interface CreateUserProps {
  readonly email: string;
  readonly userName: string;
  readonly roleName: string;
  readonly password: string;
}

export interface UserInitialProps {
  readonly id: number | string;
  readonly regionId: number | string;
  readonly firstName: string;
  readonly lastName: string;
  readonly middleName: string;
  readonly email: string;
  readonly password: string;
  readonly userName: string;
  readonly phoneNumber: string;
  readonly role: string;
  readonly image?: string;
}

declare namespace NKResponse.Customers {
  interface Customer {
    customerId?: string
    password: string
    firstName?: string | null
    middleName?: string | null
    lastName?: string | null
    fullName?: string,
    username: string,
    gender?: 0 | 1 | null
    genderName?: string
    cardId?: string | null
    dateIdentifier?: string | null
    birthDate?: string | null
    customerType?: 1 | 2
    customerTypeName?: string
    taxNumber?: string
    mobilePhone?: string
    email: string
    image?: string | null

    address?: Address[]
    includeAttributes?: {
      flc?: Avatar
    }
  }

  interface CustomerRespones {
    jwt: string,
    user: {
      id: number,
      username: string,
      email: string,
    }
  }

  interface Avatar {
    id: number
    avatar: string
    isDebit: any
    isSubscribe: any
  }

  interface Address {
    id: string
    name: string
    mobilePhone: string
    addressType: string | null
    address: string
    wardCode: string
    wardName: string
    districtCode: string
    districtName: string
    provinceCode: string
    provinceName: string
    isPrimary: boolean
    note: null
    customerAddressId: string
    isValid: boolean
  }

  interface CreateAddress {
    customerId: string
    profile: Pick<Customer, "profile">
    work: Work
    address: Omit<Address[], "id">
    includeAttributes?: {
      flc?: Avatar | null
    }
  }

  interface Work {
    jobTitle: string
    position: string
    workCompany: string
    workPhone: string
    workAddress: string
  }

  interface UpdateAddress extends CreateAddress { }

  interface UpdateInformation {
    customerId: string
    fullName: string
    birthDate: string
    mobilePhone: string
    mobilePhoneVN?: string
    gender: number
    genderName: string
  }

  interface Activity {
    [x: string]: string | number
  }

  interface VoucherEventQuota {
    isValid: boolean
    returnCode?: any
    returnMessage: string
    quantityReward: number
    quantityRemains: number
    quantityRemainsDate: number
  }

  interface VoucherEventReward {
    isValid: boolean
    returnCode?: any
    returnMessage: string
    quantityRemains: number
    transactionId: string
    voucherName: string
    voucherPrice: number
  }

  interface VoucherEventRewardConfirm {
    isValid: boolean
    returnCode?: any
    returnMessage: string
    phoneNumber: string
  }
}

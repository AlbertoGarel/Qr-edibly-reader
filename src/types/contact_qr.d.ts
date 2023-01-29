interface Contact_qr {
  content: {
    data: dataContac | undefined,
    type: number | undefined,
  },
  displayValue: string | undefined,
  format: number | undefined,
  rawValue: string | undefined
}

interface dataContac {
  addresses: string[addresses] | undefined,
  emails: string[contentEmails] | undefined,
  name: name | undefined,
  organization: string | undefined,
  phones: [phones] | undefined,
  title: string | undefined,
  urls: string[string] | undefined,
}

type addresses = {
  addressLines: string[] | undefined,
  type: number | undefined
}

type contentEmails = {
  address: string | undefined,
  body: string | undefined,
  subject: string | undefined,
  type: number | undefined,
}

type name = {
  first: string | undefined,
  formattedName: string | undefined,
  last: string | undefined,
  middle: string | undefined,
  prefix: string | undefined,
  pronunciation: string | undefined,
  suffix: string | undefined,
}

type phones = {
  number: string,
  type: number,
}
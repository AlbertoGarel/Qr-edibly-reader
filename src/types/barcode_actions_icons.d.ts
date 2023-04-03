interface Barcode_action_icons {
  web: Content_elements_actions,
  search: Content_elements_actions,
  share: Content_elements_actions,
  copy: Content_elements_actions,
  buy: Content_elements_actions,
  book: Content_elements_actions,
  email: Content_elements_actions,
  phone: Content_elements_actions,
  map: Content_elements_actions,
  add_contact: Content_elements_actions,
}

type Content_elements_actions = {
  dark_icon: string,
  light_icon: any,
  func?: () => void
}
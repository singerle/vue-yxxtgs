import { Toast } from 'mint-ui'
export function prop (text) {
  Toast({
    message: text,
    duration: 2000
  })
}

import request from '@/utils/request'

export const addClient = (client = {}) => {
  return request.put('/client', client)
}

import request from '@/utils/request'

const url = '/genre'

export function getGenre(params = {}) {
  return request({
    url,
    method: 'get',
    params
  })
}

export function updateGenre(data = {}) {
  return request({
    url: `genre/${data.id}`,
    method: 'put',
    data: data
  })
}

export function deleteGenre(genreId) {
  return request({
    url: `genre/${genreId}`,
    method: 'delete'
  })
}

export function addGenre(data = {}) {
  return request({
    url,
    method: 'post',
    data
  })
}

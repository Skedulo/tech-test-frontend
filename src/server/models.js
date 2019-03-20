import axios from 'axios'

export class GenericModel {
  constructor(endpoint) {
    this.endpoint = endpoint
    this.api = axios.create({
      baseURL: 'http://localhost:3400' // json-server endpoint
    })
  }
  
  list() {
    return this.api.get(`/${this.endpoint}`).then(res => res.data)
  }

  find(id) {
    return this.api.get(`/${this.endpoint}/${id}`).then(res => res.data)
  }

  create(data) {
    return this.api.post(`/${this.endpoint}`, data).then(res => res.data)
  }

  update(id, data) {
    return this.api.patch(`/${this.endpoint}/${id}`, data).then(res => res.data)
  }

  delete(id) {
    return this.api.delete(`/${this.endpoint}/${id}`).then(() => ({ id }))
  }
}
export class Job extends GenericModel {
  constructor() {
    super('jobs')
    this.hitCount = 0
  }

  list() {
    this.hitCount++
    setTimeout(() => this.hitCount--, 5000)
    if(this.hitCount > 20){
      throw new Error('You have hit the rate limit of this endpoint')
    }
    return super.list()
  }
}
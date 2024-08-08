export function convertTimestamps (data: any) {
  if (data.create) {
    data.create = new Date(Number(data.create) * 1000).toISOString()
  }
  if (data.upload) {
    data.upload = new Date(Number(data.upload) * 1000).toISOString()
  }
  return data
}

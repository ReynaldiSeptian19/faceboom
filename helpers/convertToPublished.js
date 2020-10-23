function convertToAgo(date) {
  let ago = Math.floor((new Date - new Date(date))/1000)
  let output
  if(ago < 60) {
    output = ago
    return `${output} second(s) ago`
  }
  else if(ago >= 60 && ago < 3600) {
    output = Math.floor(ago/60)
    return `${output} minute(s) ago`
  }
  else if(ago >= 3600 && ago < 86400) {
    output = Math.floor(ago/3600)
    return `${output} hour(s) ago`
  }
  else if(ago >= 86400) {
    output = Math.floor(ago/86400)
    return `${output} day(s) ago`
  }
}

module.exports = convertToAgo
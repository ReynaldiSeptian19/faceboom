const { Content } = require('../models/index')

class ContentController {
  static addContent(req, res) {
    res.render('./content/addContent.ejs')
  }

  static add(req, res) {
    console.log(req.params.id)
    let id = +req.params.id
    let obj = {
      post: req.body.post,
      comment: req.body.comment,
      GroupId: id
    }
    Content.create(obj)
    .then(() => {
      res.redirect(`/group/${id}`)
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = ContentController
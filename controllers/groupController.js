const { Group } = require('../models/index')

class GroupController {
  static addForm(req, res) {
    res.render('./group/addGroup.ejs')
  }

  static add(req, res) {
    let obj = {
      group_name: req.body.group_name
    }
    console.log(obj)
    Group.create(obj)
    .then(() => {
      res.redirect('/')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static editForm(req, res) {

  }

  static edit(req, res) {
    
  }
}

module.exports = GroupController
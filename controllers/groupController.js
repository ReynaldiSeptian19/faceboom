const { Group } = require('../models/index')

class GroupController {
  static showGroup(req, res) {
    Group.findAll({order: [["id", "ASC"]]})
    .then(groupData => {
      console.log(groupData)
      res.render('./group/groupList.ejs', {groupData})
    })
    .catch(err => {
      res.send(err)
    })
  }

  static addForm(req, res) {
    if(req.session.isLoggedIn === true){
      res.render('./group/addGroup.ejs')
    }else{
      res.redirect('/login')
    }
  }

  static add(req, res) {
    let obj = {
      group_name: req.body.group_name
    }
    Group.create(obj)
    .then(() => {
      res.redirect('/group')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static editForm(req, res) {
    if(req.session.isLoggedIn === true){
    let id = +req.params.id
    Group.findByPk(id)
    .then(groupData => {
      res.render('./group/editGroup.ejs', {groupData})
    })
    .catch(err => {
      res.send(err)
    })
  }else{
    res.redirect('/login')
  }
  }

  static edit(req, res) {
    let id = +req.params.id
    let obj = {
      group_name: req.body.group_name
    }
    Group.update(obj, {
      where: {
        id: id
      },
    })
    .then(() => {
      res.redirect('/group')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static delete(req, res) {
    let id = +req.params.id
    Group.destroy({
      where: {
        id: id
      }
    })
    .then(() => {
      res.redirect('/group')
    })
    .catch(err => {
      res.send(err)
    })
  }

  static groupPage(req, res) {
    let id = +req.params.id
    Group.findByPk(id)
    .then(groupData => {
      res.render('./group/group.ejs', {groupData})
    })
    .catch(err => {
      res.send(err)
    })
  }
}

module.exports = GroupController
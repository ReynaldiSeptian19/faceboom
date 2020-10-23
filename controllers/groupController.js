const convertToAgo = require('../helpers/convertToPublished')
const { Group, Content } = require('../models/index')

class GroupController {
  static showGroup(req, res) {
    Group.findAll({order: [["id", "ASC"]]})
    .then(groupData => {
      let converted = groupData.map(el => {
        return convertToAgo(el.createdAt)
      })
      console.log(converted)
      res.render('./group/groupList.ejs', {groupData, converted})
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
    Group.findByPk(id, {include: Content})
    .then(groupData => {
      let img = groupData.Contents
      res.render('./group/group.ejs', {groupData, img})
    })
    .catch(err => {
      console.log(err)
      res.send(err)
    })
  }
}

module.exports = GroupController
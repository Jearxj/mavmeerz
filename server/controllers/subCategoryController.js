"use strict"
const subCategory = require('../models/subCategory.js');

exports.addSubCategory = (sCat,essState) => {
  new subCategory({sub_category: sCat, essential: essState}).save();
};

exports.getSubCategoryId = (cat) => {
  return new Promise((resolve,reject) => {
    new subCategory().query("where", "sub_category", "=", cat).fetch().then((data) => {
      resolve(data.attributes.id)
    })
  });
};

exports.getSubCategoryNameFromId = (id) => {
  return new Promise((resolve, reject) => {
    new subCategory({id: id}).fetch().then((data) => {
      resolve(data.attributes.sub_category);
    });
  });
}

//This function will return an array subCategory id
exports.getAllSubCategories = () => {
  return new Promise((resolve,reject) => {
    new subCategory().fetchAll().then((data) => {
      var idArray = []
      data.models.forEach((sCat)=>{
        idArray.push([sCat.attributes.id,sCat.attributes.sub_category])
      });
      resolve(idArray)
    })
  });
};

exports.updateSubCategoryEss = (sCat,essState) => {
  exports.getSubCategoryId(sCat).then((id) => {
    new subCategory({id: id}).save({essential: essState});
  });
};

exports.checkSubCategoryTable = () => {
  return new Promise((resolve,reject) => {
      new subCategory().fetch().then((data) => resolve(data));
  });
}

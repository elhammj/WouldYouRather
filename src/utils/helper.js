/* This file to help in formating data 
*/

export let formatQuestion = (question, user) => {
  const { optionOne, optionTwo, id, author } = question
  return {
    id,
    optionOne,
    optionTwo,
    author
    }
}
export let appURLs = {
   web: 'http://localhost:8000/',
  //web: 'https://coloration.onrender.com/'
}


export const webAPI = {

  /************************ Account API *********************************/

  postAccountData: 'api/account/addAcountDetails',
  getAccountData: 'api/account/getallAccountDetails',
  deleteAccountData: 'api/account/delete/',
  updateAccountData: 'api/account/update/',
  getAccountById: 'api/account/get/',

  /************************ Configaration API *********************************/
  addConfigarationDetails: 'api/configaration/addConfigarationDetails',
  getProductConfigarationByProductID :'api/configaration/getConfigDataByID/'


}
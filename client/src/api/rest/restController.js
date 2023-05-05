import http from '../interceptor';

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.get('getUser');
export const updateContest = data => http.patch('updateContest', data);
export const setNewOffer = data => http.post('setNewOffer', data);
export const setOfferStatus = data => http.patch('setOfferStatus', data);
export const downloadContestFile = data =>http.post(`downloadFile/${data.fileName}`);
export const payMent = data => http.patch('pay', data.formData);
export const changeMark = data => http.patch('changeMark', data);
export const getPreviewChat = () => http.get('getPreview');
export const getDialog = data => http.get('getChat', data);
export const dataForContest = data => http.patch('dataForContest', data);
export const cashOut = data => http.patch('cashout', data);


export const updateUser = (data) => {
  console.log('data in api ',data);
return  http.patch('updateUser', data,{headers:{'Content-Type':'multipart/form-data'}});
}


export const newMessage = data => http.post('newMessage', data);
export const changeChatFavorite = data => http.patch('favorite', data);
export const changeChatBlock = data => http.patch('blackList', data);
export const getCatalogList = data => http.get('getCatalogs', data);
export const addChatToCatalog = data => http.post('addNewChatToCatalog', data);
export const createCatalog = data => http.post('createCatalog', data);
export const deleteCatalog = data => http.delete('deleteCatalog', data);
export const removeChatFromCatalog = data =>
  http.patch('removeChatFromCatalog', data);
export const changeCatalogName = data => http.patch('updateNameCatalog', data);
export const getCustomersContests = data =>
  http.get(
    'getCustomersContests',
    { limit: data.limit, offset: data.offset },
    {
      headers: {
        status: data.contestStatus,
      },
    }
  );

export const getActiveContests = ({
  offset,
  limit,
  typeIndex,
  contestId,
  industry,
  awardSort,
  ownEntries,
}) =>
  http.get('getAllContests', {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  });

export const getContestById = data =>
  http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });

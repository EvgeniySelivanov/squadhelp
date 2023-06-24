import http from '../interceptor';
import qs from 'query-string';
import CONSTANTS from '../../constants';

export const sendEmail = (offers) => {
  const data = {
    service_id: 'service_yh3v0od',
    template_id: 'template_lrq75oa',
    user_id: 'r1zWHSdotvIrvBJzL',
    template_params: {
      // to_mail: 'genyaselivanovzp@gmail.com',
      to_mail: offers.User.email,
      message: `You offer "${offers.text}" change status on ${CONSTANTS.OFFER_STATUS_APPROVED}`,
      to_name: offers.User.firstName,
      from_name: 'Squadhelp Company',
    }
  };
  fetch('https://api.emailjs.com/api/v1.0/email/send', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((result) => {
      console.log(result.statusText);
    }, (error) => {
      console.log(error.statusText);
    });
}

export const registerRequest = data => http.post('registration', data);
export const loginRequest = data => http.post('login', data);
export const getUser = () => http.get('getUser');
export const updateContest = data => http.patch('updateContest', data);
export const setNewOffer = data =>http.post('setNewOffer', data,{ headers: { 'Content-Type': 'multipart/form-data' } });

export const setOfferStatus = data => http.patch('setOfferStatus', data);
export const downloadContestFile = data => http.get(`downloadFile/${data.fileName}`);

export const changeMark = data => http.patch('changeMark', data);

export const getPreviewChat = () => http.get('getPreview');
export const newMessage = data => http.post('newMessage', data);
export const getDialog = data => http.get(`getChat?${qs.stringify({ interlocutorId: data.interlocutorId })}`);


export const dataForContest = (data) => {
  return http.get(`dataForContest?${qs.stringify({
    characteristic1: data.characteristic1,
    characteristic2: data.characteristic2
  }
  )}`);
};

export const payMent = data => http.patch('pay', data.formData);
export const cashOut = data => {
  return http.patch('cashout', data); }


export const updateUser = (data) => {
  return http.patch('updateUser', data, { headers: { 'Content-Type': 'multipart/form-data' } });
}

export const changeChatFavorite = data => http.patch('favorite', data);
export const changeChatBlock = data => http.patch('blackList', data);
export const getCatalogList = data => http.get('getCatalogs', data);
export const addChatToCatalog = data => http.post('addNewChatToCatalog', data);
export const createCatalog = data => http.post('createCatalog', data);
export const deleteCatalog = data => http.post('deleteCatalog', data);
export const removeChatFromCatalog = data => http.patch('removeChatFromCatalog', data);
export const changeCatalogName = data => http.patch('updateNameCatalog', data);

export const getCustomersContests = data =>
  http.get(
    `getCustomersContests?${qs.stringify({ limit: data.limit, offset: data.offset })}`,
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
}) => {
  const options = {
    offset,
    limit,
    typeIndex,
    contestId,
    industry,
    awardSort,
    ownEntries,
  }
  return http.get(`getAllContests?${qs.stringify(options)}`)
};

export const getAllOffers=({limit,offset})=>{
const options={limit,offset}
  return http.get(`getAllOffers?${qs.stringify(options)}`)
};


export const getContestById = data => {
  return http.get('getContestById', {
    headers: {
      contestId: data.contestId,
    },
  });
}


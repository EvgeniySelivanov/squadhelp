import { createSlice } from '@reduxjs/toolkit';
import * as restController from '../../api/rest/restController';
import CONSTANTS from '../../constants';
import { decorateAsyncThunk, pendingReducer } from '../../utils/store';

const CONTESTS_SLICE_NAME = 'contests';

const initialState = {
  isFetching: true,
  error: null,
  contests: [],
  offers: [],
  customerFilter: CONSTANTS.CONTEST_STATUS_ACTIVE,
  creatorFilter: {
    typeIndex: 1,
    contestId: '',
    industry: '',
    awardSort: 'asc',
    ownEntries: false,
  },
  haveMore: true,
};

export const getContests = decorateAsyncThunk({
  key: `${CONTESTS_SLICE_NAME}/getContests`,
  thunk: async ({ requestData, role }) => {
    const { data } =
      role === CONSTANTS.CUSTOMER
        ? await restController.getCustomersContests(requestData)
        : await restController.getActiveContests(requestData);
    return data;
  }
},
);


export const getOffers = decorateAsyncThunk({
  key: `${CONTESTS_SLICE_NAME}/getOffers`,
  thunk: async ({ requestData, role }) => {
    if (role === CONSTANTS.MODERATOR) {
      const { data } = await restController.getAllOffers(requestData);
      return data;
    }
  },
},
);


export const getAllOffersMore = decorateAsyncThunk({
  key: `${CONTESTS_SLICE_NAME}/getAllOffersMore`,
  thunk: async ({ requestData, role }) => {
    console.log('getAllOffersMore');
    if (role === CONSTANTS.MODERATOR) {
      const { data } = await restController.getAllOffers(requestData);
      return data;
    }
  },
},
);

const reducers = {
  clearContestsList: state => {
    state.error = null;
    state.contests = [];
  },
  setNewCustomerFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    customerFilter: payload,
  }),
  setNewCreatorFilter: (state, { payload }) => ({
    ...initialState,
    isFetching: false,
    creatorFilter: { ...state.creatorFilter, ...payload },
  }),
};

const extraReducers = builder => {
  builder.addCase(getContests.pending, pendingReducer);
  builder.addCase(getContests.fulfilled, (state, { payload }) => {
    state.isFetching = false;
    state.contests = [...state.contests, ...payload.contests];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getContests.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.contests = [];
  });


  builder.addCase(getOffers.pending, pendingReducer);
  builder.addCase(getOffers.fulfilled, (state, { payload }) => {
    console.log(payload);
    state.isFetching = false;
    state.offers = [ ...payload.offers];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getOffers.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.offers = [];
  });

  builder.addCase(getAllOffersMore.pending, pendingReducer);
  builder.addCase(getAllOffersMore.fulfilled, (state, { payload }) => {
    console.log(payload);
    state.isFetching = false;
    state.offers = [ ...payload.offers];
    state.haveMore = payload.haveMore;
  });
  builder.addCase(getAllOffersMore.rejected, (state, { payload }) => {
    state.isFetching = false;
    state.error = payload;
    state.offers = [];
  });



};
const contestsSlice = createSlice({
  name: CONTESTS_SLICE_NAME,
  initialState,
  reducers,
  extraReducers,
});

const { actions, reducer } = contestsSlice;

export const {
  clearContestsList,
  setNewCustomerFilter,
  setNewCreatorFilter,
} = actions;

export default reducer;

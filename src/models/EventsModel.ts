import {cast, getSnapshot, toGenerator, types} from 'mobx-state-tree';
import {EventModel} from './Events/EventModel';
import {AsyncTask, runTask} from 'mst-async-task';
import {EventsService, EventServiceTypes} from '../services';

const EventsModel = types
  .model('EventsModel')
  .props({
    allEvents: types.optional(types.array(EventModel), []),
    getEventsTask: types.optional(AsyncTask, {}),
    getEventDetailTask: types.optional(AsyncTask, {}),
    getFeaturedEventTask: types.optional(AsyncTask, {}),
    eventDetail: types.frozen(getSnapshot(EventModel.create({}))),
    featuredEvent: types.frozen(getSnapshot(EventModel.create({}))),
  })
  .views(self => ({
    get EventsCount() {
      return self.allEvents.length;
    },
  }))
  .actions(self => {
    const getAllEvents = (
      location?: string,
      limit?: number,
      isFree?: boolean,
      showError?: boolean,
      offset?: number,
      sortOn?: EventServiceTypes.EventsSortOn,
      sortBy?: EventServiceTypes.EventsSortBy,
    ) =>
      runTask(self.getEventsTask, function* () {
        const response = yield* toGenerator(
          EventsService.getAllEvents(
            location,
            limit,
            isFree,
            showError,
            offset,
            sortOn,
            sortBy,
          ),
        );
        if (response.stat === 'ok') {
          self.allEvents = cast(response.data.events);
        } else {
          throw response;
        }
      });

    const getEventDetails = (eventId: string, showError?: boolean) =>
      runTask(self.getEventDetailTask, function* () {
        const response = yield* toGenerator(
          EventsService.getEventDetails(eventId, showError),
        );

        if (response.stat === 'ok') {
          self.eventDetail = cast(response.data);
        } else {
          throw response;
        }
      });

    const getFeaturedEvent = (location: string, showError?: boolean) =>
      runTask(self.getFeaturedEventTask, function* () {
        const response = yield* toGenerator(
          EventsService.getFeaturedEvent(location, showError),
        );
        if (response.stat === 'ok') {
          self.featuredEvent = cast(response.data);
        } else {
          throw response;
        }
      });

    return {getAllEvents, getEventDetails, getFeaturedEvent};
  });

export {EventsModel};

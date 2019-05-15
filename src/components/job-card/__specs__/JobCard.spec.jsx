import React from 'react';
import { shallow } from 'enzyme';
import JobCard, { DATE_FORMAT } from '../JobCard';
import moment from 'moment';

describe('JobCard Component', () => {

  describe('snapshots', () => {
      const defaultProps = {
          name: 'Jean-Ralphio Saperstein',
          start: '2018-09-01T15:00:00Z',
          end: '2018-09-01T16:00:00Z',
          contact: { name: 'Tom Haverford'}
      };

    const renderComponent = (propOverrides = {}) => {
      const props = {
        ...defaultProps,
        ...propOverrides
      };

      return shallow(<JobCard {...props} />);
    };

    it('expect name to be rendered', () => {
      const component = renderComponent();
      const field = component.find('.job-card__name');
      expect(field.text()).toMatch('Jean-Ralphio Saperstein');
      expect(component).toMatchSnapshot();
    });

    it('expect start time to be rendered and formatted', () => {
      const component = renderComponent();
      const field = component.find('.job-card__start-time');
      expect(field.text()).toMatch(moment(defaultProps.start).format(DATE_FORMAT));
      expect(component).toMatchSnapshot();
    });

    it('expect end time to be rendered and formatted', () => {
      const component = renderComponent();
      const field = component.find('.job-card__end-time');
      expect(field.text()).toMatch(moment(defaultProps.end).format(DATE_FORMAT));
      expect(component).toMatchSnapshot();
    });

    it('expect contact name to be rendered', () => {
      const component = renderComponent();
      const field = component.find('.job-card__contact-name');
      expect(field.text()).toMatch('Tom Haverford');
      expect(component).toMatchSnapshot();
    });

  });

});
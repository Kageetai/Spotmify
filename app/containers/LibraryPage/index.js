import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import 'react-table/react-table.css';
import { List } from 'immutable';

import {
  makeSelectError,
  makeSelectLoading,
  makeSelectLibrary,
} from 'containers/App/selectors';
import { loadLibrary, exportCSV } from 'containers/App/actions';
import H1 from 'components/H1';
import Section from 'components/Section';
import Table from 'components/Table';
import Button from 'components/Button';
import { isLoggedIn } from 'utils/auth';

import messages from './messages';

class LibraryPage extends React.Component {
  componentDidMount() {
    if (isLoggedIn() && !this.props.library.size) {
      this.props.onGetLibrary();
    }
  }

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <div>
        <Helmet>
          <title>Library Page</title>
          <meta name="description" content={formatMessage(messages.header)} />
        </Helmet>

        <Section>
          <H1>
            <FormattedMessage {...messages.header} />
          </H1>
        </Section>

        <Section>
          <Table
            data={this.props.library.toJS()}
            loading={this.props.loading}
            loadingText={formatMessage(messages.libraryLoading)}
            noDataText={this.props.error ? formatMessage(messages.libraryError) : formatMessage(messages.libraryEmpty)}
          />
        </Section>

        <Section>
          <Button
            onClick={() => this.props.onExportCsv(this.props.library.toJS())}
            disabled={this.props.loading || !this.props.library}
          >
            <FormattedMessage {...messages.exportCsv} />
          </Button>
        </Section>
      </div>
    );
  }
}

LibraryPage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  onGetLibrary: PropTypes.func,
  onExportCsv: PropTypes.func,
  library: PropTypes.instanceOf(List),
  intl: PropTypes.any,
};

export function mapDispatchToProps(dispatch) {
  return {
    onGetLibrary: (page, pageSize) => dispatch(loadLibrary(page, pageSize)),
    onExportCsv: items => dispatch(exportCSV(items)),
  };
}

const mapStateToProps = createStructuredSelector({
  library: makeSelectLibrary(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, injectIntl)(LibraryPage);

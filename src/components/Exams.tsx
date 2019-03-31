import * as React from 'react';
import Table from 'reactstrap/lib/Table';
import { ExamStatus } from 'src/interfaces';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';
import { iRootState } from '../store';
import * as moment from 'moment';

const mapState = (state: iRootState) => ({
  exams: state.exams,
});

type connectedProps = ReturnType<typeof mapState>;

const statusDescriptionMap = new Map<Partial<ExamStatus>, string>([
  ['isApplying', 'Идет регистрация'],
  ['applyingFinished', 'Регистрация завершена'],
  ['canceled', 'Отменен'],
  ['isPassing', 'В процессе'],
  ['finished', 'Окончен'],
  ['nokProtocolUploaded', 'Nok протокол загружен'],
  ['nokProtocolSentToSpkfr', 'Nok протокол отправлен в spkfr'],
  ['nokProtocolRejected', 'Nok протокол отклонен'],
  ['akProtocolUploaded', 'Ak протокол загружен '],
  ['sovietProtocolUploaded', 'Протокол совета загружен'],
  ['sentToNark', 'Отправлен в Nark'],
]);

interface ExamsProps {
  activePage: number;
  itemsPerPage: number;
  totalCount: number;
  handlePageChange: (page: number) => void;
}

const Exams = (props: ExamsProps & connectedProps) => (
  <>
    <Table className="exams-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Дата и время</th>
          <th>Квалификация</th>
          <th>Уровень</th>
          <th>Город</th>
          <th>Статус</th>
        </tr>
      </thead>
      <tbody>
        {props.exams.map((exam, i) => (
          <tr key={exam.id}>
            <th scope="row">{getNumberingOffset(props.activePage, props.itemsPerPage) + (i + 1)}</th>
            <td>{moment(exam.date).format('DD.MM.YYYY hh:mm')}</td>
            <td>{exam.qualificationTitle}</td>
            <td>{exam.qualificationLevel}</td>
            <td>{exam.city}</td>
            <td>{statusDescriptionMap.get(exam.status)}</td>
          </tr>
        ))}
      </tbody>
    </Table>
    <Pagination
      activePage={props.activePage}
      itemsCountPerPage={props.itemsPerPage}
      totalItemsCount={props.totalCount}
      onChange={props.handlePageChange}
      innerClass="pagination paginationCustom"
      itemClass="page-item"
      linkClass="page-link"
    />
    </>
);

export default connect(mapState)(Exams);

const getNumberingOffset = (curPage: number, itemPerPage: number) =>
  (curPage - 1) * itemPerPage;

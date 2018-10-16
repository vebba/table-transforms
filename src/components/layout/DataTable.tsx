import * as React from 'react'
import styled from '../../utils/styled'

interface DataTableProps {
  columns: string[]
  widths?: string[]
  handleClick?: (columnId: string) => void
}

const DataTable: React.SFC<DataTableProps> = ({ children, widths, columns, handleClick }) => (
  <Wrapper>
    <thead>
      <tr>
        {columns.map((column, i) => (
          <th key={i} style={widths && widths[i] ? { width: widths[i] } : undefined}>
            {column}
            {handleClick && <TableButton onClick={() => handleClick(column)}>+</TableButton>}
          </th>
        ))}
      </tr>
    </thead>
    <tbody>{children}</tbody>
  </Wrapper>
)

export default DataTable

const TableButton = styled('button')`
  display: inline-block;
  margin-left: 1rem;
  padding: 0.2rem 0.4rem;
  border: 1px solid ${props => props.theme.colors.white};
  border-radius: 3px;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.brand};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;
`
const Wrapper = styled('table')`
  margin-bottom: 0;
  border-top: 1px solid ${props => props.theme.colors.borders};
  border-bottom: 1px solid ${props => props.theme.colors.borders};

  thead {
    tr {
      th {
        padding: 1rem;
        text-align: left;
        border-bottom: 2px solid ${props => props.theme.colors.borders};
      }
    }
  }

  tbody {
    tr {
      border-top: 1px solid ${props => props.theme.colors.borders};

      &:nth-child(even) {
        background: ${props => props.theme.colors.tableOdd};
      }

      td {
        padding: 0.5rem 1rem;
        font-size: 0.85rem;
      }
    }
  }
`

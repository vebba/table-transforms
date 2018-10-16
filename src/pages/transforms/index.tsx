import * as React from 'react'
import { Link } from 'react-router-dom'
import { connect, Dispatch } from 'react-redux'

import styled from '../../utils/styled'
import Page from '../../components/layout/Page'
import Container from '../../components/layout/Container'
import DataTable from '../../components/layout/DataTable'
import LoadingOverlay from '../../components/data/LoadingOverlay'
import LoadingOverlayInner from '../../components/data/LoadingOverlayInner'
import LoadingSpinner from '../../components/data/LoadingSpinner'

import { ApplicationState, ConnectedReduxProps } from '../../store'
import { Transform, Dictionary } from '../../store/transforms/types'
import {
  fetchRequest,
  createDictionary,
  deleteTranslation,
  deleteDictionary,
  updateTranslation,
  createTranslation
} from '../../store/transforms/actions'

// Separate state props + dispatch props to their own interfaces.
interface PropsFromState {
  loading: boolean
  data: Transform[]
  errors: string
  dictionaries: Dictionary[]
  output: Transform[]
}

// We can use `typeof` here to map our dispatch types to the props, like so.
interface PropsFromDispatch {
  fetchRequest: typeof fetchRequest
  createDictionary: typeof createDictionary
  deleteTranslation: typeof deleteTranslation
  updateTranslation: typeof updateTranslation
  deleteDictionary: typeof deleteDictionary
  createTranslation: typeof createTranslation
}

// Combine both state + dispatch props - as well as any props we want to pass - in a union type.
type AllProps = PropsFromState & PropsFromDispatch & ConnectedReduxProps



class TransformsIndexPage extends React.Component<AllProps> {
  public componentDidMount() {
    this.props.fetchRequest()
  }

  public render() {
    const { loading } = this.props

    return (
      <Page>
        <Container>
          <TableWrapper>
            {loading && (
              <LoadingOverlay>
                <LoadingOverlayInner>
                  <LoadingSpinner />
                </LoadingOverlayInner>
              </LoadingOverlay>
            )}
            <p> Original Dataset </p>
            {this.renderData()}
            {this.renderDictionaries()}
            <p> Transformed Dataset: </p>
            {this.renderOutput()}
          </TableWrapper>
        </Container>
      </Page>
    )
  }

  private renderDictionaries() {
    const { dictionaries } = this.props
    return Object.keys(dictionaries).map(dictionary => (
      <TableWrapper>
        {console.log(dictionary, 'renderDictionaries')}
        <p>{`Dictionary for ${dictionary}`}</p>
        <DataTable columns={['From', 'To', 'Options']} widths={['33%', '33%', '33%']}>
          {this.renderTranslations(dictionaries[dictionary])}
        </DataTable>
        <TableCloseButton
          onClick={() => this.props.createTranslation('vlue', 'translation_id', dictionary)}
        >
          Add row
        </TableCloseButton>
        <TableCloseButton onClick={() => this.props.deleteDictionary(dictionary)}>
          Delete
        </TableCloseButton>
      </TableWrapper>
    ))
  }

  private renderTranslations = (translations: any) => {
    console.log('[renderTranslations] : ', translations)
    return Object.keys(translations).map(item => {
      return (
        <tr key={item}>
          <td>{translations[item].from}</td>
          <td>
            <input
              type="text"
              placeholder={translations[item].to}
              onChange={e =>
                this.props.updateTranslation(e.target.value, item, translations[item].columnId)
              }
            />
          </td>
          <td>
            <button
              onClick={() => {
                console.log(item, translations[item].columnId)
                this.props.deleteTranslation(item, translations[item].columnId)
              }}
            >
              -
            </button>
          </td>
        </tr>
      )
    })
  }

  private handleCreateDictionary = (id: string) => {
    this.props.createDictionary(id.toLowerCase())
  }
  private renderData() {
    const { loading, data } = this.props

    return (
      <DataTable
        handleClick={this.handleCreateDictionary}
        columns={['Product', 'Color', 'Price']}
        widths={['auto', '', '']}
      >
        {loading &&
          data.length === 0 && (
            <TransformLoading>
              <td colSpan={3}>Loading...</td>
            </TransformLoading>
          )}
        {data.map(transform => (
          <tr key={transform.name}>
            <TransformDetail>
              {/* <TransformIcon src={API_ENDPOINT + transform.icon} alt={transform.name} /> */}
              <TransformName>
                <Link to={`/transforms/${transform.product}`}>{transform.product}</Link>
              </TransformName>
            </TransformDetail>
            <td>{transform.color}</td>
            <td>{transform.price}</td>
          </tr>
        ))}
      </DataTable>
    )
  }
  private renderOutput() {
    const { loading, output } = this.props

    return (
      <DataTable columns={['Product', 'Color', 'Price']} widths={['auto', '', '']}>
        {loading &&
          output.length === 0 && (
            <TransformLoading>
              <td colSpan={3}>Loading...</td>
            </TransformLoading>
          )}
        {output.map(transform => (
          <tr key={transform.product}>
            <TransformDetail>
              {/* <TransformIcon src={API_ENDPOINT + transform.icon} alt={transform.name} /> */}
              <TransformName>
                <Link to={`/transforms/${transform.product}`}>{transform.product}</Link>
              </TransformName>
            </TransformDetail>
            <td>{transform.color}</td>
            <td>{transform.price}</td>
          </tr>
        ))}
      </DataTable>
    )
  }
}

// It's usually good practice to only include one context at a time in a connected component.
// Although if necessary, you can always include multiple contexts. Just make sure to
// separate them from each other to prevent prop conflicts.
const mapStateToProps = ({ transforms }: ApplicationState) => ({
  loading: transforms.loading,
  errors: transforms.errors,
  data: transforms.data,
  dictionaries: transforms.dictionaries,
  output: transforms.output
})

// mapDispatchToProps is especially useful for constraining our actions to the connected component.
// You can access these via `this.props`.
const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchRequest: () => dispatch(fetchRequest()),
  createDictionary: (id: string) => dispatch(createDictionary(id)),
  deleteDictionary: (id: string) => dispatch(deleteDictionary(id)),
  deleteTranslation: (translationId: string, dictionaryId: string) =>
    dispatch(deleteTranslation(translationId, dictionaryId)),
  updateTranslation: (value: string, translationId: string, dictionaryId: string) =>
    dispatch(updateTranslation(value, translationId, dictionaryId)),
  createTranslation: (value: string, translationId: string, dictionaryId: string) =>
    dispatch(createTranslation(value, translationId, dictionaryId))
})

// Now let's connect our component!
// With redux v4's improved typings, we can finally omit generics here.
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TransformsIndexPage)

const TableWrapper = styled('div')`
  position: relative;
  max-width: ${props => props.theme.widths.md};
  margin: 0 auto;
  min-height: 200px;
`
const TableCloseButton = styled('button')`
  position: absolute;
  top: 0;
  right: 10px;
  display: inline-block;
  padding: 0.25rem 0.5rem;
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

const TransformDetail = styled('td')`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const TransformName = styled('div')`
  flex: 1 1 auto;
  height: 100%;
  margin-left: 1rem;

  a {
    color: ${props => props.theme.colors.brand};
  }
`

const TransformLoading = styled('tr')`
  td {
    height: 48px;
    text-align: center;
  }
`

import React from 'react'
import Button from '@santiment-network/ui/Button'
import {push} from "react-router-redux";
import {connect} from "react-redux";
import {prepareTemplateLink} from "../Dialog/LoadTemplate/Template";
import DuplicateTemplate from "../Dialog/DuplicateTemplate";


const UseTemplateBtn = ({template, redirect}) => {
  return <DuplicateTemplate trigger={
    <Button variant='fill' accent='positive'>Use Chart Layout</Button>
  }
                            template={template}
                            onDuplicate={(newTemplate) => {
                              redirect(prepareTemplateLink(newTemplate))
                            }
                            }/>
}

const mapDispatchToProps = dispatch => ({
  redirect: (route) => {
    dispatch(push(route))
  }
})

export default connect(null, mapDispatchToProps)(UseTemplateBtn)

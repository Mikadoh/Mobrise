// @flow

import React from 'react'
import { Badge, Text } from 'native-base'
import EStyleSheet from 'react-native-extended-stylesheet'
import type { Build } from '../services/BitriseClient'

const style = EStyleSheet.create({
  badge: {
    alignSelf: null,
    backgroundColor: '$purple',
  },
})

const BuildBranchBadge = (props: { build: Build, style?: any}) => (
  <Badge
    style={EStyleSheet.flatten([style.badge, props.style])}
  >
    <Text numberOfLines={1} >{`${props.build.branch || ''}${props.build.pull_request_id ? `#${props.build.pull_request_id}` : ''}`}</Text>
  </Badge>
)

BuildBranchBadge.defaultProps = {
  style: {},
}

export default BuildBranchBadge

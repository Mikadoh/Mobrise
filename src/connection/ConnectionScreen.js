// @flow

import React, { PureComponent } from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { View, Item, Icon, Input, Button, Text } from 'native-base'
import { WebBrowser } from 'expo'
import EStyleSheet from 'react-native-extended-stylesheet'
import { reduxify } from '../utils'
import { connect, loadToken, clearToken } from './connectionReducer'
import { connect as translate } from '../I18n'

const style = EStyleSheet.create({
  container: {
    backgroundColor: '$green',
    flex: 1,
    flexDirection: 'column',
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: 30,
  },
  bannerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 100,
  },
  banner: {
    flexShrink : 1,
    resizeMode: 'contain',
    maxHeight: 100,
  },
  contentContainer: { flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  tokenContainer: {
    flex:1,
    flexDirection: 'row',
    alignItems: 'center',
    minHeight:50,
  },
  tokenItem: {
    backgroundColor: '$lightGrey',
    marginLeft: 10,
    marginRight: 10,
    borderColor: 'white',
  },
  tokenIcon: {
    color: '$purple',
    backgroundColor: 'transparent',
  },
  tokenIconContainer: {
    height:40,
    width:40,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  tokenInput: {
    color: '$darkGrey',
  },
  connectContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  generateTokenButton: {
    borderColor: 'white',
  },
  generateTokenText: {
    color: 'white',
  },
  connectButton: {
    backgroundColor: '$purple',
    alignSelf: 'center',
  },
  bottomSpacer: {
    flex: 2,
  },
  versionText: {
    color: 'white',
    marginBottom: 5,
    alignSelf: 'center',
  },
  informationIcon: {
    color: 'white',
    marginRight: 5,
  },
  informationIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
  },
})

type Props = {
  token: string,
  connect: (string) => void,
  loadToken: () => void,
  clearToken: () => void,
  t: (string) => string,
}
type State = {
  token: string,
}
@reduxify(state => ({
  token: state.connection.token,
}), {
  connect,
  loadToken,
  clearToken,
})
@translate('connection')
export default class ConnectionScreen extends PureComponent<Props, State> {

  static navigationOptions = null // defined outside (see below) in order to be visible in translate HOC

  state: State

  constructor(props: Props) {
    super(props)
    this.state = {
      token: this.props.token,
    }
  }

  componentWillMount() {
    this.props.loadToken()
  }

  componentWillReceiveProps({ token }: { token: string}) {
    this.setState({ token })
  }

  render() {
    const { t } = this.props
    return (
      <View style={style.container}>
        <View style={style.bannerContainer}>
          <Image source={require('../assets/images/banner-transparent.png')} style={style.banner} />
        </View>

        <View style={style.contentContainer}>
          <View />
          <Item rounded style={style.tokenItem}>
            <Icon name="key" style={style.tokenIcon} />
            <Input
              placeholder={t('token')}
              value={this.state.token}
              onChangeText={(text => this.setState({ token: text }))}
              style={style.tokenInput}
            />
            <TouchableOpacity style={style.tokenIconContainer} onPress={this.props.clearToken}>
              <Icon name="close" style={style.tokenIcon} />
            </TouchableOpacity>
          </Item>
          <View style={style.connectContainer}>
            <Button rounded bordered style={style.generateTokenButton} onPress={() => WebBrowser.openBrowserAsync('https://www.bitrise.io/me/profile#/security')}>
              <Text style={style.generateTokenText}>{t('generateToken')}</Text>
            </Button>
            <Button rounded style={style.connectButton} onPress={() => this.props.connect(this.state.token)}>
              <Text>{t('connect')}</Text>
              <Icon name="arrow-forward" />
            </Button>
          </View>
          <View />
          <View />
        </View>
        <Text style={style.versionText}>{`${t('version')}: ${require('../../package.json').version || 'dev'}`}</Text>
        <TouchableOpacity style={style.informationIconContainer} onPress={() => WebBrowser.openBrowserAsync('https://github.com/PagesjaunesMobile/Mobrise')}>
          <Icon style={style.informationIcon} name="information-circle" />
        </TouchableOpacity>
      </View>
    )
  }
}

ConnectionScreen.navigationOptions = ({ screenProps }: { screenProps: { t: (string) => string } }) => ({
  header: null,
  headerBackTitle: screenProps.t('common.back'),
})

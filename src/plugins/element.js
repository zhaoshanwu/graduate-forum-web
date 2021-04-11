import Vue from 'vue'
import { Container, Header, Aside, Main, Footer } from 'element-ui'
import { Row, Col } from 'element-ui'
import { Button, Select, Option } from 'element-ui'
import { Form, FormItem, Input } from 'element-ui'
import { Tabs, TabPane } from 'element-ui'
import { Pagination } from 'element-ui'
import { Breadcrumb, BreadcrumbItem, Cascader } from 'element-ui'
import { Message } from 'element-ui'
import { RadioGroup, RadioButton, MenuItemGroup, MenuItem, Menu, Submenu } from 'element-ui'
import { Table, TableColumn } from 'element-ui'
import { Dialog } from 'element-ui'
import { Link } from 'element-ui'

Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Footer)

Vue.use(Row)
Vue.use(Col)

Vue.use(Button)
Vue.use(Select)
Vue.use(Option)

Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)

Vue.use(Tabs)
Vue.use(TabPane)

Vue.use(Pagination)

Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Cascader)

Vue.component(Message.name, Message)

Vue.use(RadioGroup)
Vue.use(RadioButton)
Vue.use(MenuItemGroup)
Vue.use(MenuItem)
Vue.use(Menu)
Vue.use(Submenu)

Vue.use(Table)
Vue.use(TableColumn)

Vue.use(Dialog)

Vue.use(Link)
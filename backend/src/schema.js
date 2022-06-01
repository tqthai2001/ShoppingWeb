import { createRequire } from "module";
const require = createRequire(import.meta.url);
const { gql } = require('apollo-server');

const typeDefs = gql`
    type User {
        id: Int!,
        email: String!,
        name: String!,
        phoneNumber: String!,
        address: String!,
        point: Int!,
        orders: [Order!],
        admin: Boolean!,
        staff: Boolean!,
    }
    type SliderImg{
        id: Int!,
        name: String!,
        publish: Boolean!,
        img: String!,
        createdAt: String!,
        updatedAt: String!,
    }
    type BannerImg{
        id: Int!,
        name: String!,
        publish: Boolean!,
        img: String!,
        createdAt: String!,
        updatedAt: String!,
    }
    type Category{
        id: Int!,
        name: String!,
        products: [Product!]
    }

    type Product{
        id:   Int     
        name: String!,
        codePro:  String!,
        categoryId:   Int!,
        description: String!,
        createdAt: String!,
        updatedAt: String!,
        material:  String!,
        color: String!,
        price: Int! ,
        size_M:  Int!,
        size_S:  Int!,
        size_L: Int!,
        size_XL: Int!,
        img_1:    String!,
        img_2:    String!,
        publish: Boolean!,
        newPro: Boolean!    
    }
    type Order{
        id: Int!,
        createdAt: String!,
        updatedAt: String!,
        namePro: String!,
        price: Int!,
        userId: Int!,
        status: String!,
    }
    type Sales{
        id: Int!,
        createdAt: String!,
        updatedAt: String!,
        disCount: Int!,
        publish: Boolean!,
    }
    type Voucher{
        id: Int!,
        createdAt: String!, 
        updatedAt: String!,
        disCount: Int!,
        condition: Int!,
    }
    type VoucherPremium{
        id: Int!,
        createdAt: String!,
        updatedAt: String!,
        disCount: Int!,
        condition: Int!,
    }
    type Accessory{
        id:   Int     
        createdAt: String!,
        updatedAt: String!,
        name: String!,
        description: String!,
        img_1:    String!,
        img_2:    String!,
        price: Int! ,
        codePro:  String!,
        count: Int!,
        material:  String!,
        color: String!,
        publish: Boolean!,
        newPro: Boolean!
    }
    type Query {
        getProduct:[Product!]!,
        getAccessory: [Accessory!]!,
        getBannerImg:[BannerImg!]!,
        getSliderImg:[SliderImg!]!,
        getUser: [User!]!,
        getOrder: [Order!]!,
        getVoucher: [Voucher!]!,
        getVoucherPremium: [VoucherPremium!]!,
        getSales: [Sales!]!,
        getSale: Sales!,
        
    }

    type Subscription{
        EventCreate: Sales,
        VoucherCreate: Voucher,
        OrderUpdate(userId: Int): Order,
        NewOrder: Order
    }

    type File {
        url: String!
    }
    scalar Upload
    input createVoucherInput{
        disCount: Int!,
        condition: Int!
    }
    input createVoucherPremiumInput{
        disCount: Int!,
        condition: Int!
    }
    input createUserInput {
        email: String!,
        name: String!,
        phoneNumber: String!,
        address: String!,
        point: Int!,
        admin: Boolean!,
        staff: Boolean!,
    }
    input createAccessoryInput {
        name: String!,
        description: String!,
        img_1:    String!,
        img_2:    String!,
        price: Int! ,
        codePro:  String!,
        count: Int!
        material:  String!,
        color: String!,
        publish: Boolean!,
        newPro: Boolean!
    }
    input createProductInput {
        name: String!,
        description: String!,
        categoryId: Int!,
        img_1:    String!,
        img_2:    String!,
        price: Int! ,
        codePro:  String!,
        size_M:  Int!,
        size_S:  Int!,
        size_L: Int!,
        size_XL: Int!,
        material:  String!,
        color: String!,
        publish: Boolean!,
        newPro: Boolean!
    }
    
    input updateUserInput {
        name: String,
        phoneNumber: String,
        address: String,
        point: Int,
    }
    input updateProductInput {
        name: String!,
        description: String!,
        categoryId: Int!,
        img_1:    String!,
        img_2:    String!,
        price: Int! ,
        codePro:  String!,
        size_M:  Int!,
        size_S:  Int!,
        size_L: Int!,
        size_XL: Int!,
        material:  String!,
        color: String!,
        publish: Boolean!,
        newPro: Boolean!
    }
    input updateAccessoryInput {
        name: String!,
        description: String!,
        img_1:    String!,
        img_2:    String!,
        price: Int! ,
        codePro:  String!,
        count: Int!,
        material:  String!,
        color: String!,
        publish: Boolean!,
        newPro: Boolean!
    }
    input createOrderInput {
        namePro: String!,
        price: Int!,
        userId: Int!,
        status: String!,
    }

    input updateVoucherInput {
        disCount: Int,
        condition: Int,
    }
    input updateVoucherPremiumInput {
        disCount: Int,
        condition: Int,
    }
    input updateOrderInput {
        status: String!,
    }
    input updateSalesInput {
        publish: Boolean
    }
    type Mutation{
        # login(data: LoginInput!): AuthPayload!
        # createUser(data: CreatedUserInput!): AuthPayload!
        # updateUser(data: UpdatedUserInput!): User!
        createSales(disCount: Int!, publish: Boolean!):Sales!,
        updateSales(id: Int!, data: updateSalesInput!): Sales!,
        createVoucher(data: createVoucherInput!):Voucher!,
        createVoucherPremium(data: createVoucherPremiumInput!):VoucherPremium!,
        createUser(data: createUserInput!): User!
        upLoadFile(file: [Upload!]!): File!,
        deleteFile(filesName: [String]):String,
        createAccessory(data: createAccessoryInput!): Accessory!,
        createProduct(data: createProductInput!): Product!,
        createOrder(data: createOrderInput!): Order!,
        updateVoucher(data: updateVoucherInput!, id: Int!): Voucher!,
        updateVoucherPremium(data: updateVoucherPremiumInput!, id: Int!): VoucherPremium!, 
        updateUser(data: updateUserInput!, email: String, userId: Int): User!,
        deleteUser(id: Int!): User,
        updateAccessory(data: updateAccessoryInput!, proId: Int!): Accessory!,
        updateProduct(data: updateProductInput!, proId: Int!): Product!,
        updateOrder(data: updateOrderInput!, id: Int!):Order!,
        deleteProduct(id: Int!): Product!,
        deleteOrder(id: Int!): Order!,
        deleteVoucher(id: Int!):Voucher!,
        deleteAccessory(id: Int!): Accessory!,
        deleteVoucherPremium(id: Int!):VoucherPremium!,
        deleteSale(id: Int!): Sales!,
    }
`;

export default typeDefs;
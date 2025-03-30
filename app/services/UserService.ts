import Category from '#models/category'
import UserCategory from '#models/user_category'
import UserCompany from '#models/user_company'

class UserService {
  public async userHasCategory(userId: number, categoryName: string): Promise<boolean> {
    const userCategories = await UserCategory.query().where('userId', userId)
    const categoriesId = userCategories.map((category) => category.categoryId)

    if (categoriesId.length === 0) {
      return false
    }

    const category = await Category.query()
      .whereIn('id', categoriesId)
      .andWhere('name', categoryName)
      .first()

    return !!category
  }

  public async userHasCompany(userId: number, orderCompanyId: number): Promise<boolean> {
    const userCompanies = await UserCompany.query().where('userId', userId)
    const companiesIds = userCompanies.map((company) => company.companyId)

    return !!companiesIds.includes(orderCompanyId)
  }
}

export default new UserService()

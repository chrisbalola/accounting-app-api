export enum TransactionCategoryEnum {
  revenue   = 'revenue', // Money received from work or from a sale (Input)
  expense  = 'expense', // Money spent on something (Output)
  grant  = 'grant', // Money received for free (Input)
  loss  = 'loss', // Money either lost or given for free with no return (Output)
  loan  = 'loan', // The user lends money to someone (Output)
  loanPayment  = 'loanPayment', // The user receives money lent to someone (Input)
  debt  = 'debt', // The user borrows money from someone (Input)
  debtPayment  = 'debtPayment', // The user pays a debt (Output)
}
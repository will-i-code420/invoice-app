<template>
  <div class="dashboard-container">
    <div class="dashboard-info-overview">
      <h3><span>{{businessCount}}</span>Total Business'</h3>
      <h3><span>{{employeeCount}}</span>Total Employees</h3>
      <h3><span>{{outstandingQuotes}}</span>Pending Quotes</h3>
    </div>
    <h2>Last {{ month }} Months Info</h2>
    <div class="charts">
      <chart
      :options="totalInvoice"
      :loading="loading"
      />
      <chart
      :options="income"
      :loading="loading"
      />
    </div>
  </div>
</template>

<script>
import invoiceService from '@/services/invoiceService'
import businessService from '@/services/businessService'
import employeeService from '@/services/employeeService'

export default {
  name: 'main-dashboard',
  data () {
    return {
      loading: true,
      month: 3,
      businessCount: 0,
      employeeCount: 0,
      outstandingQuotes: 0,
      totalInvoice: {
        title: {
          text: 'Invoice Status',
          x: 'center',
          textStyle: {
            fontSize: 28
          }
        },
        color: ['#127ac2', '#047513', '#b50915'],
        legend: {
          top: 35,
          data: ['Total Invoices', 'Total Invoices Paid', 'Total Invoices Late']
        },
        xAxis: {
          data: []
        },
        yAxis: {type: 'value'},
        series: [
        {
          name: 'Total Invoices',
          type: 'bar',
          barGap: 0,
          data: []
        },
        {
          name: 'Total Invoices Paid',
          type: 'bar',
          data: []
        },
        {
          name: 'Total Invoices Late',
          type: 'bar',
          data: []
        }
      ]
      },
      income: {
        title: {
          text: 'Income Info',
          x: 'center',
          textStyle: {
            fontSize: 28
          }
        },
        color: ['#127ac2', '#047513', '#b50915'],
        legend: {
          top: 35,
          data: ['Total Income', 'Pending Income', 'Late Income']
        },
        xAxis: {
          data: ['Jan', 'Feb', 'March']
        },
        yAxis: {type: 'value'},
        series: [
          {
            name: 'Total Income',
            type: 'line',
            data: [100, 243, 55, 10]
          },
          {
            name: 'Pending Income',
            type: 'line',
            data: [25, 33, 45, 33]
          },
          {
            name: 'Late Income',
            type: 'line',
            data: [10, 20, 30, 40]
          }
      ]
      }
    }
  },
  async created () {
    try {
      await businessService.index().then(res => {
        let businessList = res.data.business
        this.$store.dispatch('setBusinessList', businessList)
        this.businessCount = businessList.length
      })
      await employeeService.index().then(res => {
        let employeeList = res.data.employee
        this.$store.dispatch('setEmployeeList', employeeList)
        this.employeeCount = employeeList.length
      })
      await invoiceService.index().then(res => {
        let invoices = res.data.invoices
        this.$store.dispatch('setInvoiceList', invoices)
        // find all invoices by month
        let numAndDate = invoices.map(invoice => new Date(invoice.createdAt).toLocaleString('en-us', { month: 'short' }))
        .sort((a, b) => a < b)
        .reduce((obj, data) => {
          if (!obj[data]) { obj[data] = 0 }
          obj[data]++
          return obj
          }, {})
          // sort paid invoices
        let invoicePayments = invoices.map(invoice => ({paid: invoice.amount_paid, due: invoice.total_due, date: new Date(invoice.createdAt).toLocaleString('en-us', { month: 'short' })}))
        .sort((a, b) => a.date < b.date)
        let total_paid = invoicePayments.reduce((obj, data) => {
          if(!obj[data.date]) { obj[data.date] = 0}
          if (data.due - data.paid === 0) {
            obj[data.date]++
          }
          return obj
        }, {})
        this.totalInvoice.xAxis.data = [...Object.keys(numAndDate)]
        this.totalInvoice.series[0].data = [...Object.values(numAndDate)]
        this.totalInvoice.series[1].data = [...Object.values(total_paid)]
        this.loading = false
      })
    } catch (err) {
      alert(`${err}`)
    }
  }
}
</script>
